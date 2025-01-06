interface Dataset {
    label: string;
    data: number[]; // Length of 12
    borderColor: string;
    backgroundColor: string;
}

export const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const colors = [
    {
        borderColor: "#ff5466",
        backgroundColor: "#ff5466",
    },
    {
        borderColor: "#ff844b",
        backgroundColor: "#ff844b",
    },
];

const formatKey = (key: string): string => {
    return key
        .split("_") // Split the key by underscores
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join the words back with a space
};

export const convertToDatasets = (
    input: Record<string, number[]>, // Input format { year or label: number[] }
    colors: { borderColor: string; backgroundColor: string }[]
): Dataset[] => {
    if (!input) return [];
    const datasets: Dataset[] = [];
    const keys = Object.keys(input); // Extract keys from input

    keys.forEach((key, index) => {
        const data = input[key];

        if (Array.isArray(data)) {
            // Ensure the data array exists and has valid values
            datasets.push({
                label: formatKey(key), // Format the key to a readable label
                data: data.map((value) => String(value)), // Convert numbers to strings
                borderColor: colors[index % colors.length].borderColor,
                backgroundColor: colors[index % colors.length].backgroundColor,
            });
        }
    });

    return datasets;
};
