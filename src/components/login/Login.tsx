import React, { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Toast } from 'primereact/toast'
import LoginData from '../../assets/LoginInfo.json'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

interface ILogin {
  setIsLoggedIn: (value: boolean) => void;
}
export default function Login({setIsLoggedIn}:ILogin) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useRef<Toast>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const doesCredMatch = LoginData.email === email && LoginData.password === password
    if (doesCredMatch) {
      const expirationTime = new Date().getTime() + 6 * 60 * 60 * 1000; // 6 hours from now
      localStorage.setItem('session', JSON.stringify({ isLoggedIn: true, expirationTime }));
      setIsLoggedIn(true);
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid email or password',
        life: 3000
      })
    }
    console.log(doesCredMatch);
  }

  const handleSikeNoFunctionality = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'SIKE!',
      detail: 'No can do good sir!',
      life: 3000
    })
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Toast ref={toast} />
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">INDIABIX</h1>
        </div>
        <div className="bg-white p-6 rounded-md border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Sign in to INDIABIX</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-inputtext-sm border-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                inputClassName="w-full p-inputtext-sm"
                required
                feedback={false}
              />
            </div>
            <Button
              type="submit"
              label="Sign in"
              className="w-full p-button-sm"
            />
          </form>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline" onClick={handleSikeNoFunctionality}>
            Forgot password?
          </a>
        </div>
        <Divider className="my-4" />
        <div className="text-center text-sm text-gray-600">
          New to INDIABIX? <a href="#" className="text-blue-600 hover:underline" onClick={handleSikeNoFunctionality}>Create an account</a>.
        </div>
      </div>
    </div>
  )
}