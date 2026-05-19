import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const CATEGORIES = ['Fast Food', 'Pasta', 'Pizza', 'Drinks', 'Breakfast', 'Desserts', 'Local Cuisine', 'Other']

const FEATURE_OPTIONS = [
    'Vegetarian', 'Vegan', 'Gluten Free', 'Spicy', 'Chef Special',
    'Room Service', 'Outdoor Dining', 'Live Music',
]

const AddHospitality = () => {
    const { axios, fetchHospitalities } = useAppContext()
    const [image, setImage] = useState(null)
    const [input, setInput] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        features: FEATURE_OPTIONS.reduce((acc, f) => ({ ...acc, [f]: false }), {}),
    })
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!input.title || !input.category || !input.price || !image) {
            toast.error('Please fill all required fields and upload an image')
            return
        }
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', input.title)
            formData.append('description', input.description)
            formData.append('category', input.category)
            formData.append('price', input.price)
            const features = Object.keys(input.features).filter((k) => input.features[k])
            formData.append('features', JSON.stringify(features))
            formData.append('image', image)

            const { data } = await axios.post('/api/hospitalities/', formData)
            if (data.success) {
                toast.success(data.message)
                fetchHospitalities()
                setInput({
                    title: '', description: '', category: '', price: '',
                    features: FEATURE_OPTIONS.reduce((acc, f) => ({ ...acc, [f]: false }), {}),
                })
                setImage(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Title
                align='left'
                font='outfit'
                title='Add Hospitality'
                subTitle='Add dining, drinks, or services guests can discover on the Hospitality page and home page.'
            />

            <div className='w-full mt-4'>
                <p className='text-gray-800'>Title</p>
                <input
                    type="text"
                    placeholder='e.g. Tropical Sunset Cocktail'
                    className='border border-gray-300 mt-1 rounded p-2 w-full max-w-lg'
                    value={input.title}
                    onChange={(e) => setInput({ ...input, title: e.target.value })}
                    required
                />
            </div>

            <div className='w-full mt-4'>
                <p className='text-gray-800'>Description</p>
                <textarea
                    placeholder='Describe this dish or service...'
                    className='border border-gray-300 mt-1 rounded p-2 w-full max-w-lg h-24 resize-none'
                    value={input.description}
                    onChange={(e) => setInput({ ...input, description: e.target.value })}
                />
            </div>

            <div className='flex flex-wrap gap-4 mt-4 max-w-lg'>
                <div className='flex-1 min-w-[140px]'>
                    <p className='text-gray-800'>Category</p>
                    <select
                        value={input.category}
                        onChange={(e) => setInput({ ...input, category: e.target.value })}
                        className='border border-gray-300 mt-1 rounded p-2 w-full'
                        required
                    >
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <p className='text-gray-800'>Price (ETB)</p>
                    <input
                        type="number"
                        min="1"
                        placeholder='350'
                        className='border border-gray-300 mt-1 rounded p-2 w-28'
                        value={input.price}
                        onChange={(e) => setInput({ ...input, price: e.target.value })}
                        required
                    />
                </div>
            </div>

            <p className='text-gray-800 mt-6'>Image</p>
            <label htmlFor="hospitalityImage" className='inline-block mt-2 cursor-pointer'>
                <img
                    className='max-h-24 rounded-lg border'
                    src={image ? URL.createObjectURL(image) : assets.uploadArea}
                    alt="upload"
                />
                <input
                    type="file"
                    id="hospitalityImage"
                    accept="image/*"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>

            <p className='text-gray-800 mt-6'>Features / tags</p>
            <div className='flex flex-col gap-2 mt-2 max-w-sm'>
                {FEATURE_OPTIONS.map((feature) => (
                    <label key={feature} className='flex items-center gap-2 text-gray-600 text-sm'>
                        <input
                            type="checkbox"
                            checked={input.features[feature]}
                            onChange={() => setInput({
                                ...input,
                                features: { ...input.features, [feature]: !input.features[feature] },
                            })}
                        />
                        {feature}
                    </label>
                ))}
            </div>

            <button
                type="submit"
                disabled={loading}
                className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer disabled:opacity-60'
            >
                {loading ? 'Adding...' : 'Add Hospitality'}
            </button>
        </form>
    )
}

export default AddHospitality
