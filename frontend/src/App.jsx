import { useEffect, useState } from 'react';
import Client from './lib/client';
import { newDocument } from './lib/helpers';
import EditableDocumentList from './components/EditableDocumentList';
import ToggleableDocumentForm from './components/ToggleableDocumentForm';
import Modal from 'react-modal';
import Paginator from './components/Paginator';

const client = new Client();

const DocumentsDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState([])
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const loadDocumentsFromServer = (page) => {
    client
      .getDocuments(page)
      .then((serverDocuments) => setDocuments(serverDocuments))
      .then(() => setLoading(false));
  };

  const handleCreateFormSubmit = (document) => {
    createDocument(document);
  };

  const handleEditFormSubmit = (attrs) => {
    updateDocument(attrs);
  };

  const handleTrashClick = (documentId) => {
    deleteDocument(documentId);
  };

  const createDocument = (document) => {
    const newDoc = newDocument(document);

    setDocuments([...documents, newDoc]);

    client
      .createDocument(newDoc)
      .then((doc) => {
        setDocuments([...documents, doc]);
      })
      .catch(() => {
        setDocuments([...documents]);
      });
  };

  const updateDocument = (attrs) => {
    const newDocuments = documents.map((document) => {
      if (document.id === attrs.id) {
        return {
          ...attrs,
        };
      } else {
        return document;
      }
    });

    setDocuments(newDocuments);

    client.updateDocument(attrs);
  };

  const deleteDocument = (documentId) => {
    setCurrentPage(1);
    loadPagesFromServer();
    loadDocumentsFromServer(currentPage);
    
    client.deleteDocumentById(documentId).catch(() => {
      setCurrentPage(1);
      loadPagesFromServer();
      loadDocumentsFromServer(currentPage);
    });
  };

  const handleOpenModal = (titulo, informacion) => {
    setShowModal(true);
    setModalContent([titulo, informacion])
  }
  
  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent([])
  }

  const loadPagesFromServer = () => {
    client
    .getTotalDocuments()
    .then((serverPages) => setTotalDocuments(serverPages["COUNT(*)"]));
  }

  useEffect(() => {
    loadPagesFromServer();
    loadDocumentsFromServer(currentPage);
    // setInterval(loadDocumentsFromServer, 5000);
  }, [documents, currentPage]);

  return (
    <div className="ui padded grid">
      <div className="one wide column"></div>

      <div className="ten wide column">
        <EditableDocumentList
          documents={documents}
          onFormSubmit={handleEditFormSubmit}
          onTrashClick={handleTrashClick}
          handleOpenModal={handleOpenModal}
          loading={loading}
        />

        <Paginator
          totalDocuments={totalDocuments}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setLoading={setLoading}
          setDocuments={setDocuments}
        />

      </div>

      <div className="four wide column">
        <ToggleableDocumentForm onFormSubmit={handleCreateFormSubmit} />
      </div>

      <div className="one wide column"></div>

      <Modal
        isOpen={showModal}
        contentLabel="Modal documento"
        ariaHideApp={false}
      >
        <div className='closeModalDocument'>
          <button onClick={handleCloseModal} className='ui basic red button'>X</button>
        </div>

        <h2 className='titleModalDocument'>{modalContent[0]}</h2>

        <p className='textModalDocument'>
          {modalContent[1]}
        </p>

        <div className='centerModalDocument'>
          <button onClick={handleCloseModal} className='ui basic red button'>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentsDashboard;
