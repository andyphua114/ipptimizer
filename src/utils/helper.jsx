export function findNext(input, current) {
  // Create a new object to store the results
  let result = {};

  // Iterate through the input object
  for (const [key, value] of Object.entries(input)) {
    // Convert key to a number for comparison
    //const numericKey = parseInt(key, 10);
    // Update the result only if the value is new or the key is smaller
    if (!(value in result) || key < result[value]) {
      result[value] = key;
    }
  }

  const values = Object.values(result);
  const targetIndex = values.findIndex((element) => Number(element) > current);
  return values[targetIndex];
}

export function findNextCard(input, current, stationOptimize) {
  // Create a new object to store the results

  const values = Object.values(input);
  if (stationOptimize === "2.4km Run") {
    const targetIndex = values.findIndex(
      (element) => Number(element) < current
    );
    return Object.keys(input)[targetIndex - 1];
  }

  const targetIndex = values.findIndex((element) => Number(element) >= current);
  return Object.keys(input)[targetIndex];
}

export function findNextTiming(input, current) {
  // Function to convert "minutes:seconds" into total seconds
  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  // Create a new object to store the results
  const result = {};

  // Iterate through the input object
  for (const [key, value] of Object.entries(input)) {
    // Convert key (time) to total seconds for comparison
    const numericKey = timeToSeconds(key);
    // Update the result only if the value is new or the key (in seconds) is larger
    if (!(value in result) || numericKey > timeToSeconds(result[value])) {
      result[value] = key; // Keep the original time format
    }
  }

  const values = Object.values(result);
  const targetIndex = values.findIndex(
    (element) => timeToSeconds(element) < timeToSeconds(current)
  );

  return calculateTimeDifference(values[targetIndex - 1], values[targetIndex]);
}

// Function to calculate time difference in seconds
export function calculateTimeDifference(time1, time2) {
  // Helper function to convert "hours:minutes" to total minutes
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Convert both times to total minutes
  const minutes1 = toMinutes(time1);
  const minutes2 = toMinutes(time2);

  // Calculate absolute difference in minutes
  return Math.abs(minutes2 - minutes1);
}
