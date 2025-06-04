import { useState } from "react";
import { createUser } from "../../api/adminApi";
import { useSelector } from "react-redux";
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

const CreateUserPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "", role: "normal" });
    const { user, token } = useSelector((state) => state.auth);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    console.log("token", token);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await createUser(formData, token);
            alert("User created successfully!");
            setFormData({ name: "", email: "", password: "", address: "", role: "normal" });
        } catch (error) {
            setError(error.response?.data?.message || "Error creating user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create New User</h2>
            {error && <div style={styles.errorMessage}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength={20}
                        placeholder="Enter full name (minimum 20 characters)"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email address"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        placeholder="Enter password (minimum 6 characters)"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="address" style={styles.label}>Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        minLength={10}
                        placeholder="Enter address (minimum 10 characters)"
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="role" style={styles.label}>Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="normal">Normal User</option>
                        <option value="store_owner">Store Owner</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        ...styles.button,
                        ...(loading ? styles.buttonDisabled : {})
                    }}
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
};

export default CreateUserPage;
