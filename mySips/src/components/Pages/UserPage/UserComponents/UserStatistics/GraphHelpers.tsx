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

interface Dataset {
    label: string;
    data: number[];
    backgroundColor: string[];
}

export const convertToPieDataset = (
    input: Record<number, number>, // Input object with numerical keys and values
    colors: string[] = [
        "#E84B5D", // Darker Red (slightly pastel)
        "#F24F63", // Deep Red (slightly pastel)
        "#FF5868", // Red (slightly pastel)
        "#FF6A5E", // Red-Orange (slightly pastel)
        "#FF7E54", // Reddish-Orange (slightly pastel)
        "#FF9250", // Orange-Red (slightly pastel)
        "#FFA750", // Orange (slightly pastel)
        "#FDBC3F", // Light Orange (slightly pastel)
        "#FACA3F", // Orange-Yellow (slightly pastel)
        "#F5E03F", // Yellow-Orange (slightly pastel)
        "#f2ef3f", // Yellow (slightly pastel)
    ]
) => {
    if (!input) return [];

    const labels = Object.keys(input).map((key) => String(key)); // Convert numerical keys to strings
    const data = Object.values(input); // Extract values as data
    const backgroundColor = labels.map(
        (_, index) => colors[index % colors.length]
    ); // Assign colors cyclically

    return [
        {
            label: "Pie Chart", // Default label
            data,
            backgroundColor,
        },
    ];
};
