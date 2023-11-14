import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export const ImagesView = () => {
  const [uploadedImages, setUploadedImages] = useState([]); // To store the list of uploaded images
  const [error, setError] = useState(null);

  // UPLOAD IMAGE
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    event.target.value = '';                                // clear file input calue (for busboy)
    // const key = `original-images/images/${Date.now()}_${file.name}`;        // create unique key

    fetch('http://LB-26-14148712.eu-central-1.elb.amazonaws.com/upload', {
    // fetch('http://localhost:8080/upload', {
      method: 'POST',
      headers: { "Access-Control-Allow-Origin": "http://LB-26-14148712.eu-central-1.elb.amazonaws.com/" },
      body: formData,
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Image upload failed.');
        }
      })
      .then((data) => {
        console.log('data', data);
        const imageName = file.name;
        setUploadedImages((prevImages) => [...prevImages, imageName]); 
        console.log('file name: ', imageName);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // SHOW IMAGES
  const fetchImages = () => {
    fetch('http://LB-26-14148712.eu-central-1.elb.amazonaws.com/images')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch images.');
        }
      })
      .then((data) => {
        // console.log("data: ", data);
        const imageUrls = data.Contents.map((image) => {
          // console.log("image: ", image);
          const imageURL = `http://task26-images-bucket.s3-website.eu-central-1.amazonaws.com/${image.Key}`;
          // const resizedImageURL = `http://task26-images-bucket.s3-website.eu-central-1.amazonaws.com/resized/${image.Key}`;
          return { original: imageURL, key: image.Key };
        });
        setUploadedImages(imageUrls);
      })
      .catch((error) => {
        setError(error.message);
      });
  };


  useEffect(() => {
    fetchImages();
  }, []);

  // DOWNLOAD IMAGE
  const handleImageDownload = (imageURL, imageKey) => {
    const link = document.createElement('a');             // "a" element triggers download
    link.href = imageURL;
    link.download = imageKey;                             // don't change file name for downloaded image
    link.click();
    console.log("imageKey: ", imageKey);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Images</Card.Title>
          <input type="file" name="image" accept="*" onChange={handleImageUpload} />
        </Card.Body>
      </Card>

      {error && <div className="error-message">{error}</div>}

      <Card>
        <Card.Body>
          <Card.Title>Uploaded Images</Card.Title>
          <ListGroup>
            {uploadedImages.map((image, index) => (
              <ListGroupItem key={index}>
                
                <img src={image.original} alt="image"/>
                {/* <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleImageDownload(image.original, image.key)}
                >
                  Download
                </Button> */}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};