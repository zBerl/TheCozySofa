export default function TestEnv() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="space-y-2">
        <p><strong>Space ID:</strong> {process.env.CONTENTFUL_SPACE_ID}</p>
        <p><strong>Access Token:</strong> {process.env.CONTENTFUL_ACCESS_TOKEN ? '✓ Set' : '✗ Not Set'}</p>
        <p><strong>Environment:</strong> {process.env.CONTENTFUL_ENVIRONMENT}</p>
      </div>
    </div>
  );
} 