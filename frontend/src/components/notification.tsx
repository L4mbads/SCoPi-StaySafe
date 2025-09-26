type NotificationProps = {
  message?: string;
  type: 'error' | 'success';
};

export default function Notification({ message, type }: NotificationProps) {
  if (!message) return null;

  const styles = {
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
  };

  return (
    <div className={`border px-4 py-3 rounded-lg ${styles[type]}`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
}