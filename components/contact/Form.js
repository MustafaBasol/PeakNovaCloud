'use client'
import { useState } from 'react'
import * as Form from '@radix-ui/react-form';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ContactForm({ isOpen, setIsOpen, setToastVariant, color }) {

    const [data, setData] = useState({
        name:'',
        surname:'',
        email:'',
        telefon:'',
        servis:'',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const t = useTranslations('Form')

    const formSubmit = async(event) => {
        event.preventDefault()
        setIsSubmitting(true)
        try{
            const response = await fetch('/api/sendMail', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    data
                })
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            setData({
                name:'',
                surname:'',
                email:'',
                telefon:'',
                servis:'',
            })
            setToastVariant?.('success')
            setIsOpen(true)
        }
        catch(err){
            setToastVariant?.('error')
            setIsOpen(true)
        }
        finally {
            setIsSubmitting(false)
        }
    }
    const changeValue = (event) => {
        const value = event.target.value
        const name = event.target.name
        setData({ ...data, [name]:value })
    }
    
  return (
    <div>
        <Form.Root 
            onSubmit={formSubmit} 
            className='w-5/6 lg:w-4/6 mx-auto  h-fit text-[--text] p-8 flex flex-col gap-4 rounded-lg shadow-lg pb-16'
            style={{ backgroundColor:`var(--${color})`}}
        >
            <div className='grid grid-cols-2 gap-4'>
                <Form.Field name='name' className='flex flex-col justify-end'>
                    <div className='flex justify-between'>
                        <Form.Label className=''>{t('name')}</Form.Label>                    
                        <Form.Message className='text-xs' match="valueMissing">{t('nameError')}</Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input 
                            className='input h-10'
                            type='text'
                            name='name'
                            required
                            value={data.name}
                            onChange={changeValue}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name='surname' className='flex flex-col'>
                    <div className='flex justify-between'>
                        <Form.Label>{t('surname')}</Form.Label>                    
                        <Form.Message className='text-xs' match="valueMissing">{t('surnameError')}</Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input 
                            className='input h-10'
                            type='text'
                            required
                            name='surname'
                            value={data.surname}
                            onChange={changeValue}                            
                        />
                    </Form.Control>                
                </Form.Field>
            </div>
            <Form.Field name='email' className='flex flex-col'>
                <div className='flex justify-between'>
                    <Form.Label>{t('email')}</Form.Label>                    
                    <Form.Message className='text-xs' match="valueMissing">{t('emailError')}</Form.Message>
                    <Form.Message className="text-xs text-white opacity-[0.8]" match="typeMismatch">{t('emailValidationError')}</Form.Message>

                </div>
                <Form.Control asChild>
                    <input 
                        className='input h-10'
                        type='email'
                        required
                        name='email'
                        value={data.email}
                        onChange={changeValue}                          
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field name='phone' className='flex flex-col'>
                <div className='flex justify-between'>
                    <Form.Label>{t('tele')}</Form.Label>                    
                    <Form.Message className='text-xs' match="valueMissing">{t('teleError')}</Form.Message>
                    <Form.Message className="text-xs opacity-[0.8]" match="typeMismatch">{t('teleValidationError')}</Form.Message>
                </div>
                <Form.Control asChild>
                    <input 
                        className='input h-10'
                        type='tel'
                        required
                        name='telefon'
                        value={data.telefon}
                        onChange={changeValue}                          
                    />
                </Form.Control>
            </Form.Field>            
            <Form.Field name='explain' className='flex flex-col'>
                <div className='flex justify-between'>
                    <Form.Label>{t('service')}</Form.Label>                    
                    <Form.Message className='text-xs' match="valueMissing">{t('serviceError')}</Form.Message>
                </div>
                <Form.Control asChild>
                    <textarea 
                        className='input h-24'
                        type='text'
                        required
                        name='servis'
                        value={data.servis}
                        onChange={changeValue}                          
                    />
                </Form.Control>
            </Form.Field>            
            <Form.Submit asChild>
                <motion.button
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : {
                        backgroundColor:'var(--hovered)'
                    }}
                    transition={{
                        duration:0.3,
                        ease:'easeInOut'
                    }}
                    className='border-2 w-5/6 sm:w-3/6 md:w-2/6 mx-auto p-2 md:p-4 rounded-full bg-[--primary] text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'>
                    {isSubmitting && (
                        <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin' aria-hidden='true' />
                    )}
                    {isSubmitting ? t('sending') : t('buttonText')}
                </motion.button>
            </Form.Submit>
           
        </Form.Root>
    </div>
  )
}
