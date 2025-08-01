import { useEffect, useState } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: 'Ask me anything...',
        botId: 'e846b244-6d3e-4845-97e2-8bb05b062447',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: 'e846b244-6d3e-4845-97e2-8bb05b062447',
        showPoweredBy: false,
        enableConversationDeletion: true,
        containerWidth: '350px',
        layoutWidth: '100%',
        lazySocket: true,
        hideWidget: true, // Try to hide default bubble
      });

      // 🚫 Force hide default button immediately after init
      window.botpressWebChat.sendEvent({ type: 'hide' });

      // 🔔 Listen for incoming messages to update unread badge
      window.botpressWebChat.onEvent(function (event) {
        if (event.type === 'message' && !isOpen) {
          setUnreadCount((prev) => prev + 1);
        }
      });
    };
  }, [isOpen]);

  const toggleChat = () => {
    window.botpressWebChat.sendEvent({ type: isOpen ? 'hide' : 'show' });
    setIsOpen(!isOpen);
    if (!isOpen) setUnreadCount(0);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]" onClick={toggleChat}>
      {/* ✅ Only your custom button */}
      {/* <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-md relative"
        title="Chat"
      >
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
        <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
          <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"/>
        </svg>
      </button> */}
    </div>
  );
};

export default ChatWidget;
