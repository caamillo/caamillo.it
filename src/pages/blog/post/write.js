// React
import { useState } from 'react'

// Components
import BlogLayout from '@/components/Blog/BlogLayout'

// Deps
import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

export default function Write() {
    const [text, setText] = useState('## Write here your post')

    return (
        <BlogLayout>
            <MdEditor
                modelValue={ text }
                onChange={ setText }
                theme='light'
                language='en-US'
                codeTheme='github'
            />
        </BlogLayout>
    )
}