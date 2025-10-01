import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ChatBubble({ message, isSender }) {
  const alignment = isSender ? 'items-end' : 'items-start';
  const bubbleColor = isSender
    ? 'bg-emerald-600 text-white'
    : 'bg-gray-100 text-gray-800';
  const borderRadius = isSender
    ? 'rounded-l-xl rounded-tr-xl'
    : 'rounded-r-xl rounded-tl-xl';

  return (
    <div className={`flex flex-col w-full max-w-xs ${isSender ? 'ml-auto' : 'mr-auto'} ${alignment}`}>
      <div className={`px-4 py-3 ${bubbleColor} ${borderRadius} shadow-sm`}>
        <p className="text-sm">{message.content}</p>
      </div>
      <div className="text-xs text-gray-400 mt-1 px-1">
        <span>{message.sender_name}</span> &middot;{' '}
        <span>{format(new Date(message.created_date), 'HH:mm', { locale: ptBR })}</span>
      </div>
    </div>
  );
}