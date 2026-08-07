import React, { useEffect } from 'react'
import { getDetectionByUserId } from '../service/detectionService'

function HomePage() {
 useEffect(() => {
    const loadData = async () => {
        const data = await getDetectionByUserId();
        console.log(data);
    };

    loadData();
}, []);
  return (
    <div>HomePage</div>
  )
}

export default HomePage