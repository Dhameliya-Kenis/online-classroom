import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocalContext } from "../../context/context";
import db, { storage } from '../../lib/firebase';
import firebase from 'firebase';
import "./style.css";


const Announcment = ({ classData }) => {
  const [announcment, setAnnouncment] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const { loggedInMail } = useLocalContext();
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);
  

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadImage = storage.ref(`submit/${image.name}`).put(image);
    
    uploadImage.on("state_changed", () => {
      storage
        .ref("submit")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("announcments")
            .doc("classes")
            .collection(classData.id)
            .add({
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              text: inputValue,
              name : image.name,
              sender: loggedInMail,
            });
        });
    });
  };

  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcments")
        .doc("classes")
        .collection(classData.id)
        .onSnapshot((snap) => {
          setAnnouncment(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);
  console.log(announcment);
  return (
    <div>
      {announcment.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>
            
            <p className="amt__txt">Download Link : <a href={item.imageUrl} >{item.name} </a></p>

            

            {showInput ? (
              <div className="main__form">
              <TextField
                id="filled-multiline-flexible"
                multiline
                label="Upload Your Work"
                variant="filled"
                value={inputValue}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="main__buttons">
                <input
                  onChange={handleChange}
                  variant="outlined"
                  color="primary"
                  type="file"
                />

                <div>
                  <Button onClick={() => setShowInput(false)}>
                    Cancel
                  </Button>

                  <Button
                    onClick={handleUpload}
                    color="primary"
                    variant="contained"
                  >
                    Post
                  </Button>
                </div>
              </div>
              <div>
              {announcment.map((item) => (
                <div className="amt">
                  <div className="amt__Cnt">
                    <div className="amt__top">
                      <Avatar />
                      <div>{item.sender}</div>
                    </div>
                    <p className="amt__txt">{item.text}</p>
                    <p className="amt__txt">Download Link : <a href={item.imageUrl} >{item.name} </a></p>
                  </div>
                </div>
              ))}
            </div>
            </div>
            
            ):(
              <div onClick={() => setShowInput(true)}>    
                <div>Upload Your Work</div>
              </div>
            )}
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcment;
