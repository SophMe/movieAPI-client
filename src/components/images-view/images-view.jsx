import React, { useState } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export const ImagesView = () => {
  const [uploadedImages, setUploadedImages] = useState([]); // To store the list of uploaded images
  const [error, setError] = useState(null);

  // Function to handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    event.target.value = '';              // for busboy
    const key = `images/${Date.now()}_${file.name}`;        // create unique key

    // fetch('http://loadbalancer-1689168057.eu-central-1.elb.amazonaws.com/upload', {
    fetch('http://localhost:8080/upload', {
      method: 'POST',
      // headers: {
      // // //   // "Access-Control-Allow-Origin": "http://loadbalancer-1689168057.eu-central-1.elb.amazonaws.com/",
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
        // setUploadedImages((prevImages) => [...prevImages, imageName]);
          return response.json();
        } else {
          throw new Error('Image upload failed.');
        }
      })
      .then((data) => {
        console.log('data', data);
        const imageName = file.name;
        setUploadedImages((prevImages) => [...prevImages, imageName]);  // imageName get this from backend
        console.log('file name: ', imageName);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // // show images
  // const fetchImages = () => {
  //   fetch('http://loadbalancer-1689168057.eu-central-1.elb.amazonaws.com/images')
  //   // fetch('http://localhost:8080/images')
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Failed to fetch images.');
  //       }
  //     })
  //     .then((data) => {
  //       setUploadedImages(data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // };

  // download image
  const handleImageDownload = (imageName) => {
    // Fetch to download image
    // fetch(`http://loadbalancer-1689168057.eu-central-1.elb.amazonaws.com/images/${imageName}`)
    fetch(`http://localhost:8080/images/${imageName}`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Image download failed.');
        }
      })
      .then((blob) => {

      })
      .catch((error) => {
        setError(error.message);
      });
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
            {uploadedImages.map((imageName) => (
              <ListGroupItem key={imageName}>
                
                <img src={imageName} alt="image-name"/>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleImageDownload(imageName)}
                >
                  Download
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};