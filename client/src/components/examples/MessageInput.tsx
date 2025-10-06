import MessageInput from '../MessageInput';

export default function MessageInputExample() {
  const handleSend = (message: string) => {
    console.log('Message sent:', message);
  };

  return (
    <div className="w-full bg-background">
      <MessageInput onSend={handleSend} />
    </div>
  );
}
