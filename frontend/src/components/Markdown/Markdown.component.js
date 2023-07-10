import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css';

import './Markdown.style.scss';

const Markdown = (props) => {
  return <ReactMarkdown
    className='markdown'
    children={props.content}
    remarkPlugins={[remarkMath, [remarkGfm]]}
    rehypePlugins={[rehypeKatex]}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, '')}
            style={oneLight}
            language={match[1]}
            PreTag="div"
            showLineNumbers={true}
          />
        ) : (
          <code {...props} className={className}>
            {children}
          </code>
        )
      }
    }}
  />
};

export default Markdown;