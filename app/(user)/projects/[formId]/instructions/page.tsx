'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import lightwidget from '../../../../../assets/lightwidget.png'
import { Switch } from '@/components/ui/switch'
import { Fira_Code } from 'next/font/google'
const firaCode = Fira_Code({ subsets: ['latin'] })
const widgets = [
  {
    id: 'light',
    name: 'Light Widget',
    description: 'A light-themed widget for your website',
    scriptUrl: 'https://quickfeedwidgetlight.netlify.app/widget.js',
    previewImage: lightwidget.src,
  },
  {
    id: 'dark',
    name: 'Dark Widget',
    description: 'A dark-themed widget for your website',
    scriptUrl: 'https://quickfeedwidgetdark.netlify.app/widget.js',
    previewImage: '/placeholder.svg?height=200&width=400',
  },
]

const codeExamples = {
  typescript: `
import axios from 'axios';

interface Feedback {
  id: number;
  projectId: number;
  message: string;
  rating: number;
  name: string | null;
  createdAt: string;
}

async function getFeedback(id: number): Promise<Feedback[]> {
  const response = await axios.get(\`https://quickfeed-dashboard.vercel.app/api/feedback/\${id}\`);
  return response.data;
}

// Usage
getFeedback(41).then(feedbacks => {
  feedbacks.forEach(feedback => {
    console.log(\`Feedback from \${feedback.name || 'Anonymous'}: \${feedback.message}\`);
  });
});
`,
  javascript: `
fetch('https://quickfeed-dashboard.vercel.app/api/feedback/41')
  .then(response => response.json())
  .then(feedbacks => {
    feedbacks.forEach(feedback => {
      console.log(\`Feedback from \${feedback.name || 'Anonymous'}: \${feedback.message}\`);
    });
  })
  .catch(error => console.error('Error:', error));
`,
  python: `
import requests

def get_feedback(id):
    response = requests.get(f'https://quickfeed-dashboard.vercel.app/api/feedback/{id}')
    return response.json()

# Usage
feedbacks = get_feedback(41)
for feedback in feedbacks:
    print(f"Feedback from {feedback['name'] or 'Anonymous'}: {feedback['message']}")
`,
  java: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONArray;
import org.json.JSONObject;

public class FeedbackFetcher {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://quickfeed-dashboard.vercel.app/api/feedback/41"))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        JSONArray feedbacks = new JSONArray(response.body());

        for (int i = 0; i < feedbacks.length(); i++) {
            JSONObject feedback = feedbacks.getJSONObject(i);
            String name = feedback.isNull("name") ? "Anonymous" : feedback.getString("name");
            String message = feedback.getString("message");
            System.out.println("Feedback from " + name + ": " + message);
        }
    }
}
`
}

export default function WidgetImplementation({ params }: { params: { formId: string } }) {
  const [selectedWidget, setSelectedWidget] = useState(widgets[1]) // Start with Dark Widget selected
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('typescript')

  
  const toggleWidget = () => {
    setSelectedWidget(prevWidget => prevWidget.id === 'light' ? widgets[1] : widgets[0])
  }

  if (!params.formId) return <div className="text-white">Invalid Project ID</div>

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 3000)
  }
  
  const id = params.formId

  return (
    <div className="py-8 max-w-7xl rounded-md mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">API Documentation & Widget Implementation</h1>

      <Card className="mb-8 bg-[#EDF0F2] dark:bg-[#0F0F11] border-[#CED4DA] dark:border-[#131314]">
        <CardHeader>
          <CardTitle><h1>API Overview</h1></CardTitle>
          <CardDescription>
            <h1>Access feedback data for your project using the following API endpoint:</h1>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-200 dark:bg-[#171717] p-2 rounded-md  overflow-x-auto">
            <code>
              https://quickfeed-dashboard.vercel.app/api/feedback/{id}
            </code>
          </div>
          <p className="mt-4">
            Replace {'{id}'} with your project ID to retrieve feedback for that specific project.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-[#EDF0F2] dark:bg-[#0F0F11] border-[#CED4DA] dark:border-[#131314]">
        <CardHeader>
          <CardTitle><h1>Code Examples</h1></CardTitle>
          <CardDescription className="text-gray-200">
            Here are examples of how to fetch and map over the feedback data in different programming languages:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="md:hidden mb-4">
            <Select onValueChange={setSelectedLanguage} defaultValue={selectedLanguage}>
                <SelectTrigger className="w-full bg-[#DEE2E6] dark:bg-[#0F0F11]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="typescript" value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <TabsList className="bg-transparent hidden md:flex justify-start">
              <TabsTrigger value="typescript" className="data-[state=active]:bg-[#E9ECEF] dark:data-[state=active]:bg-[#171717]"><h1>TypeScript</h1></TabsTrigger>
              <TabsTrigger value="javascript" className="data-[state=active]:bg-[#E9ECEF] dark:data-[state=active]:bg-[#171717]"><h1>JavaScript</h1></TabsTrigger>
              <TabsTrigger value="python" className="data-[state=active]:bg-[#E9ECEF] dark:data-[state=active]:bg-[#171717]"><h1>Python</h1></TabsTrigger>
              <TabsTrigger value="java" className="data-[state=active]:bg-[#E9ECEF] dark:data-[state=active]:bg-[#171717]"><h1>Java</h1></TabsTrigger>
            </TabsList>
            {Object.entries(codeExamples).map(([lang, code]) => (
              <TabsContent key={lang} value={lang}>
                <ScrollArea className="h-[400px] w-full rounded-md border-[#CED4DA] dark:border-[#131314]">
                  <div className="rounded-lg overflow-hidden h-full">
                    <pre className={`p-4 dark:bg-[#171717] bg-gray-200 overflow-x-auto h-full ${firaCode.className}`}>
                      <code>{code}</code>
                    </pre>
                  </div>
                </ScrollArea>
                <Button
                  onClick={() => copyCode(code)}
                  className="mt-2 dark:bg-[#E2E2E2] bg-[#343A40]"
                >
                  {copiedCode === code ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Copied
                    </>
                  ) : ( 
                    <>
                      <Copy className="mr-2 h-4 w-4" /> Copy Code
                    </>
                  )}
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-[#EDF0F2] dark:bg-[#0F0F11] border-[#CED4DA] dark:border-[#131314]">
        <CardHeader>
          <CardTitle><h1>Feedback Object Structure</h1></CardTitle>
          <CardDescription>
            <p>Each feedback item in the response will have the following structure:</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full rounded-md">
            <pre className="dark:bg-[#171717] bg-gray-200 p-4 rounded-md overflow-x-auto">
              <code>{`
{
  "id": number,
  "projectId": number,
  "message": string,
  "rating": number,
  "name": string | null,
  "createdAt": string (ISO 8601 date)
}
              `}</code>
            </pre>
          </ScrollArea>
          <ul className="md:list-disc list-inside mt-4 flex flex-col md:gap-2 gap-5">
            <li className='text-sm'><strong>id:</strong> Unique identifier for the feedback</li>
            <li className='text-sm'><strong>projectId:</strong> ID of the project this feedback belongs to</li>
            <li className='text-sm'><strong>message:</strong> The feedback message</li>
            <li className='text-sm'><strong>rating:</strong> Numerical rating (if applicable)</li>
            <li className='text-sm'><strong>name:</strong> Name of the person who left the feedback (optional)</li>
            <li className='text-sm'><strong>createdAt:</strong> Timestamp when the feedback was created</li>
          </ul>
        </CardContent>
      </Card>

    
      <Card className="bg-[#EDF0F2] dark:bg-[#0F0F11] border-[#CED4DA] dark:border-[#131314]">
        <CardHeader>
            <CardTitle >Widget Implementation</CardTitle>
          <CardDescription >
            Add the following code to your website to implement the {selectedWidget.name}:
          </CardDescription>
          <div className="flex items-center space-x-2">
              <span className="text-sm">Light</span>
              <Switch
                checked={selectedWidget.id === 'dark'}
                onCheckedChange={toggleWidget}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm">Dark</span>
            </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full rounded-md">
            <pre className="dark:bg-[#171717] bg-gray-200 p-4 rounded-md overflow-x-auto">
              <code>{`
<my-widget project="${params.formId}"></my-widget>
<script src="${selectedWidget.scriptUrl}"></script>
              `}</code>
            </pre>
          </ScrollArea>
          <Button
            onClick={() => copyCode(`<my-widget project="${params.formId}"></my-widget>\n<script src="${selectedWidget.scriptUrl}"></script>`)}
            className="mt-4 dark:bg-[#E2E2E2] bg-[#343A40]"
          >
            {copiedCode === `<my-widget project="${params.formId}"></my-widget>\n<script src="${selectedWidget.scriptUrl}"></script>` ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}