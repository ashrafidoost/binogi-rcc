import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid } from "@mui/material";
import { Recipe, SearchResponse } from "../../types/RecipeTypes";

const SearchForm: React.FC<{
  onSearchResults: (results: Recipe[]) => void;
}> = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await axios.get<SearchResponse>(
        "https://api.edamam.com/api/recipes/v2",
        {
          params: {
            type: "public",
            q: query,
            app_id: "df53c267",
            app_key: "bd80595496a524a833554462aa41a04c",
          },
        }
      );
      onSearchResults(response.data.hits.map((hit) => hit.recipe));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Enter your recipes to search..."
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          className="btn btn-primary btn-block"
        >
          {loading ? "Loading..." : "Search"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
