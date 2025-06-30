import React from 'react'

function ResultsSection({ results }) {
    return (
        <section className="results-section">
            <h2>Recommended Cards</h2>
            <div className="results-grid">
                {results.map((card) => (
                    <div key={card.id} className="card-result">
                        <div className="card-header">
                            <div className="card-image">{card.image}</div>
                            <div className="card-info">
                                <h3>{card.name}</h3>
                                <p className="issuer">{card.issuer}</p>
                            </div>
                            <div className="card-rating">
                                <span className="rating">{card.rating}★</span>
                            </div>
                        </div>

                        <div className="card-details">
                            <div className="detail-row">
                                <span>Annual Fee:</span>
                                <span className={card.annualFee === 0 ? 'no-fee' : 'has-fee'}>
                                    {card.annualFee === 0 ? 'No Fee' : `$${card.annualFee}`}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span>Credit Score:</span>
                                <span>{card.creditScore}</span>
                            </div>
                            <div className="detail-row">
                                <span>Cashback:</span>
                                <span className="highlight">{card.cashback}</span>
                            </div>
                            <div className="detail-row">
                                <span>Miles:</span>
                                <span className="highlight">{card.miles}</span>
                            </div>
                        </div>

                        <button className="apply-button">Apply Now</button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ResultsSection 