import Head from 'next/head'
import Header from '@components/header'
import React, { useState } from 'react'

const Cars: React.FC = () => {
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    condition: ''
  })
  const [showPrice, setShowPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [yap, setYap] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.model || !formData.brand || !formData.condition) {
        setYap('Please fill in all fields');
        alert('pls fill the form')
        return;
    }

    const newPrice = Math.floor(Math.random() * (30000 - 20000) + 20000);
    setPrice(newPrice);
    setShowPrice(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>Car Trade</title>
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <p className="text-lg mb-4">
          Fill in the below form with the information of the car you wish to trade and a value will be generated for you.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div className="flex flex-col">
            <label htmlFor="model" className="mb-1">Model:</label>
            <input
              type="text"
              id="model"
              value={formData.model}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="brand" className="mb-1">Brand:</label>
            <input
              type="text"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="condition" className="mb-1">Condition:</label>
            <input
              type="text"
              id="condition"
              value={formData.condition}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showPrice && (
          <span className='price mt-4 block'>
            The estimated value of your car is <strong>${price}</strong>
          </span>
        )}
      </main>
    </>
  )
}

export default Cars