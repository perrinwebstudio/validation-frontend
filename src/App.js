import { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!email || !selectedFile) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append('email', email);
      formData.append('csvFile', selectedFile);
      console.log('----- file: ', formData)

      // Make API call using Axios
      const response = await axios.post('http://localhost:3000/upload', formData);
      console.log('----- response: ', response)
      // Handle success
      setSuccess('File uploaded successfully!');
      setEmail('');
      setSelectedFile(null);
      setError('');
    } catch (error) {
      // Handle error
      setError('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Validate Phone numbers and Emails using a CSV file here.
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <label className="block text-xs font-medium leading-6 text-gray-900">
                Please enter your email address to receive the updated result via email.
              </label>
            </div>
          </div>

          <div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload CSV file
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>{selectedFile ? selectedFile.name : 'Upload a file'}</span>
                      <input id="file-upload" name="csvFile" type="file" required className="sr-only" accept='.csv' onChange={handleFileUpload} />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">Only CSV file</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Upload
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          It takes around 3 hours to validate 4,500 lines of CSV file. Please wait for the email.
        </p>

        {error && <p className='text-red-500 mb-2'>{error}</p>}
        {success && <p className='text-green-500 mb-2'>{success}</p>}
      </div>
    </div>
  )
}
