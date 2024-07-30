import React from 'react';

const GooglePreview = ({ fileUrl }) => {
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;

  return (
    <div>
      <iframe
        src={googleDocsViewerUrl}
        width="600"
        height="780"
        style={{ border: 'none' }}
        allowFullScreen
        title="Document Viewer"
      ></iframe>
    </div>
  );
};

export default GooglePreview;
