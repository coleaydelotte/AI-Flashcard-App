"use client";

import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import {
  Box,
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const data = await fetch("/api/generate", {
      method: "POST",
      body: text,
    });
    const flash = [{
      "front": "Mercury",
      "back": "The smallest planet in our solar system and closest to the sun. It has a rocky surface with craters and cliffs."
  },
  {
      "front": "Venus",
      "back": "The hottest planet in our solar system with a thick atmosphere of carbon dioxide, trapping heat. "
  },
  {
      "front": "Earth",
      "back": "The only planet known to support life, with a diverse range of ecosystems and a dynamic atmosphere."
  },
  {
      "front": "Mars",
      "back": "Known as the 'Red Planet' due to iron oxide on its surface. It has a thin atmosphere and evidence of past liquid water."
  },
  {
      "front": "Jupiter",
      "back": "The largest planet in our solar system, a gas giant with a powerful magnetic field and a Great Red Spot storm."
  },
  {
      "front": "Saturn",
      "back": "Known for its prominent ring system composed of ice and rock particles. It's also a gas giant with a low density."
  },
  {
      "front": "Uranus",
      "back": "An ice giant with a tilted axis, causing extreme seasons. It has a faint ring system and a blue-green color."
  },
  {
      "front": "Neptune",
      "back": "The farthest planet from the sun, an ice giant with strong winds and a dark blue color."
  },
  {
      "front": "Dwarf Planets",
      "back": "Celestial bodies orbiting the sun that are smaller than planets and haven't cleared their orbital path of other objects."
  },
  {
      "front": "Asteroid Belt",
      "back": "A region between Mars and Jupiter containing a large concentration of asteroids, remnants from the early solar system."
  }]
    setFlashcards(flash);
    };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
  
    try {
      const batch = writeBatch(db);
      console.log("User ID:", user.id);
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("Flashcards under this name already exist");
          return;
        } else {
          collections.push({ name });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }
  
      const colRef = collection(userDocRef, name);
      flashcards.forEach((f) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, f);
      });
  
      await batch.commit();
      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("There was an error saving your flashcards. Please try again.");
    }
  };
  

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Generate Flashcards</Typography>
        <Paper sx={{ p: 4, width: "100%" }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Flashcards Preview</Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          "& > div > div": {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpen}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={saveFlashcards}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
