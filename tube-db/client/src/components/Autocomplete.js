import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const categoryData = [
    { label: "Action and Adventure" },
    { label: "Anime and Animation" },
    { label: "Autos and Vehicles" },
    { label: "Classics"},
    { label: "Comedy"},
    { label: "Documentary"},
    { label: "Drama"},
    { label: "Education"},
    { label: "Entertainment"},
    { label: "Family" },
    { label: "Film and Animation" },
    { label: "Foreign" },
    { label: "Funny" },
    { label: "Gaming" },
    { label: "Horror" },
    { label: "Howto and Style" },
    { label: "Movies" },
    { label: "Music" },
    { label: "News and Politics" },
    { label: "Nonprofit and Activism" },
    { label: "People and Blogs" },
    { label: "Pets and Animals" },
    { label: "Sci-Fi and Fantasy" },
    { label: "Science and Technology" },
    { label: "Short Movies" },
    { label: "Shorts" },
    { label: "Shows" },
    { label: "Sports" },
    { label: "Thriller" },
    { label: "Trailers" },
    { label: "Travel and Events" },
    { label: "Videoblogging" }
]
    
   const ComboBox = ({value, onChange}) => {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categoryData}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} placeholder="Type Here" intputValue={value} onChange={onChange}
        onSelect={onChange}/>}
        
      />
    );
  }

  export default ComboBox;
