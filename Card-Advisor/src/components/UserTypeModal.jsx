import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserTypeModal({ isOpen, onClose }) {
    const navigate = useNavigate()

    const handleAdvancedUser = () => {
        navigate('/app/advanced')
    }

    const handleNormalUser = () => {
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Welcome to Card Advisor</h2>
                    <p>Please select your user type to get started</p>
                </div>

                <div className="modal-body">
                    <div className="user-type-options">
                        <button
                            className="user-type-button advanced"
                            onClick={handleAdvancedUser}
                        >
                            <div className="user-type-icon">🚀</div>
                            <div className="user-type-content">
                                <h3>Advanced User</h3>
                                <p>I want detailed control over spending categories and advanced filtering options</p>
                            </div>
                        </button>

                        <button
                            className="user-type-button normal"
                            onClick={handleNormalUser}
                        >
                            <div className="user-type-icon">👤</div>
                            <div className="user-type-content">
                                <h3>Normal User</h3>
                                <p>I want a simple, guided experience to find the best credit card for me</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTypeModal 