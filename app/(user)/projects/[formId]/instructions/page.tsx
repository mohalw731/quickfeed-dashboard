'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const widgets = [
  {
    id: 'light',
    name: 'Light Widget',
    description: 'A light-themed widget for your website',
    scriptUrl: 'https://quickfeedwidgetlight.netlify.app/widget.js',
    previewImage: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 'dark',
    name: 'Dark Widget',
    description: 'A dark-themed widget for your website',
    scriptUrl: 'https://quickfeedwidgetdark.netlify.app/widget.js',
    previewImage: '/placeholder.svg?height=200&width=400',
  },
]

export default function WidgetImplementation({ params }: { params: { formId: string } }) {
  const [selectedWidget, setSelectedWidget] = useState(widgets[0])
  const [copyNotification, setCopyNotification] = useState('')

  if (!params.formId) return <div>Invalid Project ID</div>

  const copyCode = () => {
    const code = `<my-widget project="${params.formId}"></my-widget>\n<script src="${selectedWidget.scriptUrl}"></script>`
    navigator.clipboard.writeText(code)
    setCopyNotification('Code copied to clipboard!')
    setTimeout(() => setCopyNotification(''), 3000) 
  }

  return (
    <div className="container mx-auto px-4 text-white">
      <h1 className="md:text-4xl font-bold mb-3 ">Implement the <span className="text-blue-500">Widget</span></h1>
      <p className="text-lg mb-8 text-slate-200">Choose a widget style and add it to your website</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {widgets.map((widget) => (
          <Card key={widget.id} className={`bg-[#202020] cursor-pointer transition-all duration-200 border-[#303030] ${selectedWidget.id === widget.id ? 'ring-4 ring-[#353535]' : ''}`} onClick={() => setSelectedWidget(widget)}>
            <CardHeader>
              <CardTitle className='text-white'>{widget.name}</CardTitle>
              <CardDescription className='text-slate-200'>{widget.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md overflow-hidden">
                <img
                  src={widget.previewImage}
                  alt={`Preview of ${widget.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8 bg-[#202020] border-[#303030]">
        <CardHeader>
          <CardTitle className='text-white'>Installation</CardTitle>
          <CardDescription className='text-slate-200'>
            Place the following code snippet inside the {"<head>"} or at the end of the {"<body>"} of your HTML file:
          </CardDescription>
        </CardHeader>
        <CardContent className='bg-[#202020]'>
          <pre className="p-4 bg-muted rounded-md overflow-x-auto ">
            <code>
              {`<my-widget project="${params.formId}"></my-widget>\n<script src="${selectedWidget.scriptUrl}"></script>`}
            </code>
          </pre>
          <div className="flex items-center mt-4">
            <Button onClick={copyCode}  className='bg-[#303030] hover:bg-[#353535]'>
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
            {copyNotification && (
              <span className="ml-2 text-sm text-green-500">{copyNotification}</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Link href={`/projects/${params.formId}/`}>
        <Button size="lg" className="bg-blue-500 hover:bg-blue-600 hover:scale-105">Start Collecting Feedback</Button>
      </Link>
    </div>
  )
}