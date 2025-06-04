'use client';

// Custom React component for handling GitHub Gists
// Carefully handle inserting HTML into the DOM to avoid XSS attacks
// This custom component will be used to handle that
import { useEffect, useState } from 'react'
import GitHubGistType from '@/utils/types/GitHubGistType';

export function GitHubGist({ id }: GitHubGistType) {
  const [gistContent, setGistContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGist = async () => {
      try {
        const url = `https://api.github.com/gists/${id}`
        
        const response = await fetch(url)
        const data = await response.text()
        setGistContent(data)
      } catch (error) {
        console.error('Failed to load gist:', error)
        setGistContent('Failed to load gist')
      } finally {
        setLoading(false)
      }
    }

    fetchGist()
  }, [id])

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
  }

  return (
    <div className="my-6">
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
        <code>{gistContent}</code>
      </pre>
    </div>
  )
}