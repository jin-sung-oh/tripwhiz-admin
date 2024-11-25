import React, { useEffect, useState } from "react";
import { getSpots } from "../../api/spotAPI";
import { Spot } from "../../types/spot";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

const SpotListComponent = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const fetchSpots = async (currentPage: number) => {
    try {
      const response: Spot[] = await getSpots(currentPage, PAGE_SIZE);
      console.log("API Response:", response); // API 응답 확인
      setSpots(response); // 배열로 직접 설정
    } catch (error: any) {
      console.error("Error fetching spots:", error); // 에러 로그
      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        alert("Failed to fetch spots.");
      }
    }
  };

  useEffect(() => {
    fetchSpots(page);
  }, [page]);

  useEffect(() => {
    console.log("Updated spots:", spots); // 상태 확인
  }, [spots]);

  return (
    <Box maxWidth={1200} mx="auto" mt={4}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Spot List
      </Typography>
      <Grid container spacing={3}>
        {spots.length > 0 ? (
          spots.map((spot) => (
            <Grid item xs={12} sm={6} md={4} key={spot.spno}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{spot.spotname}</Typography>
                  <Typography>Address: {spot.address}</Typography>
                  <Typography>Phone: {spot.tel}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" mt={4} color="error">
            No spots available.
          </Typography>
        )}
      </Grid>
      <Box textAlign="center" mt={4}>
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={spots.length < PAGE_SIZE}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SpotListComponent;
