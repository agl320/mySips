import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import NumberField from "./NumberField";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { Toggle } from "../ui/toggle";
import { Check } from "lucide-react";
import { Slider, styled } from "@mui/material";
import clsx from "clsx";
import { Drink } from "@/classes/Drink";
import DrinkPriceInput from "./DrinkPriceInput";

export type IDrinkInputProps = {
    drinkInputState: Pick<Drink, "uid"> & Partial<Drink>;
    setDrinkInputState: React.Dispatch<
        React.SetStateAction<Pick<Drink, "uid"> & Partial<Drink>>
    >;
    formType?: "activity" | "information";
};

const NewDay = styled(PickersDay)(({ theme }) => ({
    "&.Mui-selected": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
    },
    "&.selected-day": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

const marks = [
    {
        value: 0,
        label: "0%",
    },
    {
        value: 25,
        label: "25%",
    },
    {
        value: 50,
        label: "50%",
    },
    {
        value: 75,
        label: "75%",
    },
    {
        value: 100,
        label: "100%",
    },
];

function DrinkInput({
    drinkInputState,
    setDrinkInputState,
    formType,
}: IDrinkInputProps) {
    const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

    useEffect(() => {
        const highlightedDays = Object.keys(
            drinkInputState.drinkRecordHistory ?? []
        );
        setDrinkInputState((prevState) => ({ ...prevState, highlightedDays }));
    }, [drinkInputState.drinkRecordHistory, setDrinkInputState]);

    const toggleDrinkRecord = () => {
        if (!selectedDate) return;
        const dateKey = selectedDate.format("MM-DD-YYYY");
        const updatedHistory = { ...drinkInputState.drinkRecordHistory };

        if (updatedHistory[dateKey]) {
            delete updatedHistory[dateKey];
        } else {
            updatedHistory[dateKey] = { date: dateKey };
        }

        setDrinkInputState({
            ...drinkInputState,
            drinkRecordHistory: updatedHistory,
        });
    };

    const renderNewDay = (props) => {
        const {
            highlightedDays = [],
            day,
            outsideCurrentMonth,
            ...other
        } = props;
        const dateKey = day.format("MM-DD-YYYY");
        const isHighlighted = highlightedDays.includes(dateKey);
        const isSelected = dateKey === selectedDate?.format("MM-DD-YYYY");

        return (
            <NewDay
                {...other}
                day={day}
                selected={isHighlighted || isSelected}
                className={clsx({ "selected-day": isSelected })}
                outsideCurrentMonth={outsideCurrentMonth}
            />
        );
    };

    if (formType === "activity") {
        return (
            <div>
                <NumberField
                    label="Rating:"
                    initialValue={drinkInputState.rating ?? 5}
                    onChange={(rating) =>
                        setDrinkInputState({ ...drinkInputState, rating })
                    }
                />

                <div className="flex mt-4">
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newDate) =>
                            setSelectedDate(newDate ? moment(newDate) : null)
                        }
                        slots={{ day: renderNewDay }}
                        slotProps={{
                            day: {
                                highlightedDays:
                                    drinkInputState.highlightedDays,
                            },
                        }}
                    />

                    <div className="w-2/5 p-4 bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-md rounded-l-none">
                        <p className="text-xl font-medium text-white">
                            You drank {drinkInputState.name} on{" "}
                            {selectedDate?.format("MMMM Do YYYY") || "a date"}.
                        </p>
                        <Toggle
                            defaultPressed={
                                drinkInputState.drinkRecordHistory &&
                                selectedDate &&
                                Object.hasOwn(
                                    drinkInputState.drinkRecordHistory,
                                    selectedDate?.format("MM-DD-YYYY")
                                )
                                    ? !!drinkInputState.drinkRecordHistory?.[
                                          selectedDate?.format("MM-DD-YYYY")
                                      ]
                                    : false
                            }
                            pressed={
                                drinkInputState.drinkRecordHistory &&
                                selectedDate &&
                                Object.hasOwn(
                                    drinkInputState.drinkRecordHistory,
                                    selectedDate?.format("MM-DD-YYYY")
                                )
                                    ? !!drinkInputState.drinkRecordHistory?.[
                                          selectedDate?.format("MM-DD-YYYY")
                                      ]
                                    : false
                            }
                            onClick={toggleDrinkRecord}
                            className="mt-2 bg-white/25 text-pastel-pink rounded-md w-full flex items-center justify-center focus:outline-none data-[state=on]:bg-white data-[state=on]:text-pastel-orange hover:bg-white/40"
                        >
                            <Check strokeWidth={4} />
                        </Toggle>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mt-4 flex">
                <div className="w-2/3 mr-4">
                    <Label>Drink name</Label>
                    <Input
                        type="text"
                        placeholder="New drink"
                        value={drinkInputState.name}
                        onChange={(e) =>
                            setDrinkInputState({
                                ...drinkInputState,
                                name: e.target.value,
                            })
                        }
                        maxLength={32}
                    />
                </div>
                <div className="w-1/3">
                    <Label>Drink price</Label>
                    <DrinkPriceInput
                        drinkInputState={drinkInputState}
                        setDrinkInputState={setDrinkInputState}
                    />
                </div>
            </div>

            <div className="flex mt-4">
                <div className="w-1/2 flex flex-col">
                    <Label>Drink description</Label>
                    <Textarea
                        placeholder="Drink description"
                        value={drinkInputState.description}
                        onChange={(e) =>
                            setDrinkInputState({
                                ...drinkInputState,
                                description: e.target.value,
                            })
                        }
                        maxLength={300}
                        className="resize-none h-full"
                    />
                </div>
                <div className="w-1/2 ml-6 pr-4 pl-2">
                    <Label>Ice level</Label>
                    <Slider
                        value={[drinkInputState.iceLevel]}
                        max={100}
                        step={25}
                        shiftStep={25}
                        marks={marks}
                        onChange={(
                            event: Event,
                            newValue: number | number[]
                        ) => {
                            // Ensure `newValue` is treated as an array if necessary
                            const value = Array.isArray(newValue)
                                ? newValue[0]
                                : newValue;

                            if ([0, 25, 50, 75, 100].includes(value)) {
                                console.log(value);
                                setDrinkInputState({
                                    ...drinkInputState,
                                    iceLevel: value, // Assign the single value
                                });
                            }
                        }}
                    />
                    <Label>Sugar level</Label>
                    <Slider
                        value={[drinkInputState.sugarLevel]}
                        max={100}
                        step={25}
                        shiftStep={25}
                        marks={marks}
                        onChange={(
                            event: Event,
                            newValue: number | number[]
                        ) => {
                            // Ensure `newValue` is treated as an array if necessary
                            const value = Array.isArray(newValue)
                                ? newValue[0]
                                : newValue;

                            if ([0, 25, 50, 75, 100].includes(value)) {
                                console.log(value);
                                setDrinkInputState({
                                    ...drinkInputState,
                                    sugarLevel: value, // Assign the single value
                                });
                            }
                        }}
                    />
                </div>
            </div>
            <div className="mt-4">
                <Label>Store name</Label>
                <Input
                    type="text"
                    placeholder="Store name"
                    value={drinkInputState.store?.storeName || ""}
                    onChange={(e) =>
                        setDrinkInputState({
                            ...drinkInputState,
                            store: {
                                ...drinkInputState.store,
                                storeName: e.target.value,
                            },
                        })
                    }
                    maxLength={32}
                />
            </div>
            <div className="mt-4">
                <Label>Street address</Label>
                <Input
                    type="text"
                    placeholder="Street address"
                    value={drinkInputState.store?.storeAddress || ""}
                    onChange={(e) =>
                        setDrinkInputState({
                            ...drinkInputState,
                            store: {
                                ...drinkInputState.store,
                                storeAddress: e.target.value,
                            },
                        })
                    }
                    maxLength={32}
                />
            </div>
        </div>
    );
}

export default DrinkInput;
