import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

const AdminMessages = () => {
  const { messages, deleteMessage, markAsRead } = useShop();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      filterStatus === 'all' ? true :
      filterStatus === 'read' ? msg.isRead :
      !msg.isRead; 

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="admin-title">Messagerie ({messages.length})</h1>

      {/* Barre de Filtres */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: 'white', padding: '20px', borderRadius: '8px' }}>
        <input 
          type="text" 
          placeholder="🔍 Rechercher (Nom, Email, Sujet)..." 
          className="admin-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <select 
          className="admin-select" 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="all">Tous les messages</option>
          <option value="unread">Non lus</option>
          <option value="read">Déjà lus</option>
        </select>
      </div>

      {/* Liste des Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredMessages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Aucun message trouvé.</p>
        ) : (
          filteredMessages.map(msg => (
            <div key={msg.id} style={{
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              borderLeft: msg.isRead ? '5px solid #bdc3c7' : '5px solid #e74c3c', // Rouge si non lu, Gris si lu
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#2c3e50' }}>{msg.subject}</h3>
                <span style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                  {new Date(msg.date).toLocaleDateString()} à {new Date(msg.date).toLocaleTimeString()}
                </span>
              </div>
              
              <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#34495e' }}>
                <strong>De:</strong> {msg.name} ({msg.email})
              </div>
              
              <p style={{ background: '#f9f9f9', padding: '15px', borderRadius: '4px', color: '#555' }}>
                {msg.message}
              </p>

              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                {!msg.isRead && (
                  <button 
                    onClick={() => markAsRead(msg.id)} 
                    className="admin-btn-submit" 
                    style={{ background: '#3498db', fontSize: '0.8rem', padding: '5px 10px' }}
                  >
                    Marquer comme lu
                  </button>
                )}
                <button 
                  onClick={() => { if(window.confirm('Supprimer ce message ?')) deleteMessage(msg.id) }} 
                  className="admin-btn-delete"
                >
                  Supprimer
                </button>
                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;