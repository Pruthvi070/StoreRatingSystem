import React, { useState } from 'react';
import { createStore } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import './styles/Create.css';

const styles = {
    container: {
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '2rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontWeight: '500',
        color: '#555'
    },
    input: {
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    },
    textarea: {
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        minHeight: '100px',
        resize: 'vertical'
    },
    button: {
        backgroundColor: '#4a90e2',
        color: 'white',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed'
    },
    errorMessage: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        textAlign: 'center'
    },
    sectionTitle: {
        color: '#333',
        marginTop: '1rem',
        marginBottom: '0.5rem',
        fontSize: '1.1rem',
        fontWeight: '500'
    }
};

const CreateStore = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        store_name: '',
        email: '',
        address: '',
        owner_email: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate form data
            if (!formData.store_name || !formData.email || !formData.address || !formData.owner_email) {
                throw new Error('All fields are required');
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email) || !emailRegex.test(formData.owner_email)) {
                throw new Error('Invalid email format');
            }

            await createStore(formData);
            alert('Store created successfully!');
            navigate('/admin/stores');
        } catch (error) {
            if (error.message === 'Session expired. Please login again.') {
                // The API will handle the redirect
                return;
            }
            setError(error.message || 'Error creating store');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create New Store</h2>
            {error && <div style={styles.errorMessage}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="store_name" style={styles.label}>Store Name</label>
                    <input
                        type="text"
                        id="store_name"
                        name="store_name"
                        value={formData.store_name}
                        onChange={handleChange}
                        required
                        minLength={3}
                        placeholder="Enter store name"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Store Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter store email"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="address" style={styles.label}>Store Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        minLength={10}
                        placeholder="Enter store address"
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="owner_email" style={styles.label}>Owner Email</label>
                    <input
                        type="email"
                        id="owner_email"
                        name="owner_email"
                        value={formData.owner_email}
                        onChange={handleChange}
                        required
                        placeholder="Enter owner's email"
                        style={styles.input}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        ...styles.button,
                        ...(loading ? styles.buttonDisabled : {})
                    }}
                >
                    {loading ? 'Creating...' : 'Create Store'}
                </button>
            </form>
        </div>
    );
};

export default CreateStore;
