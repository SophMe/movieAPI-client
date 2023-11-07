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
    const key = `images/${Date.now()}_${file.name}`;        // create unique key

    fetch('http://loadbalancer-1689168057.eu-central-1.elb.amazonaws.com/upload', {
    // fetch('http://localhost:8080/upload', {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "http://loadbalancer-1689168057.eu-central-1.elb.amazonaws.com/",
      },
      //   "Content-Type": "multipart/form-data",
      // },
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
    fetch('http://loadbalancer-1689168057.eu-central-1.elb.amazonaws.com/images')
    // fetch('http://localhost:8080/images')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch images.');
        }
      })
      .then((data) => {
        const imageUrls = data.Contents.map((image) => {
          const imageURL = `http://task4-images-bucket.s3-website.eu-central-1.amazonaws.com/${image.Key}`;
          return imageURL
        })
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
  // const handleImageDownload = (imageURL, imageKey) => {
  //   // Create an "a" element to trigger the download
  //   const link = document.createElement('a');
  //   link.href = imageURL;

  //   // Set the file name for the downloaded image to be the same as image.Key
  //   link.download = imageKey;
  //   link.click();
  // };

  // const handleImageDownload = (imageKey) => {
  //   // fetch(`http://task4-images-bucket.s3-website.eu-central-1.amazonaws.com/${imageKey}`)
  //   // fetch(`http://localhost:8080/images/${imageName}`)
  //   fetch(imageURL)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.blob();
  //       } else {
  //         throw new Error('Image download failed.');
  //       }
  //     })
  //     .then((blob) => {
  //       const imageURL = URL.createObjectURL(blob);
  //       setImageUrl(imageURL);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // };

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
            {uploadedImages.map((imageURL, index) => (
              <ListGroupItem key={index}>
                
                <img src={imageURL} alt="image-url"/>
                {/* <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleImageDownload(imageURL)}
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