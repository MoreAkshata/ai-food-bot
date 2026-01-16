
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.role === 'model';

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-lg ${
          isBot 
            ? 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-bl-none' 
            : 'bg-amber-600 text-white rounded-br-none'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60">
            {isBot ? 'Concierge' : 'You'}
          </span>
          <span className="text-[10px] opacity-40">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
