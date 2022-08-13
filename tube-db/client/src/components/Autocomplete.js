import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const categoryData = [
    { label: "Autos and Vehicles" },
    { label: "Comedy"},
    { label: "Education"},
    { label: "Entertainment"},
    { label: "Film and Animation" },
    { label: "Gaming" },
    { label: "Howto and Style" },
    { label: "Music" },
    { label: "News and Politics" },
    { label: "People and Blogs" },
    { label: "Pets and Animals" },
    { label: "Science and Technology" },
    { label: "Sports" },
    { label: "Travel and Events" }
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
