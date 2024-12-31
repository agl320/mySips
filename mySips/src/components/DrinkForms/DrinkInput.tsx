import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import NumberField from "./NumberField";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { Toggle } from "../ui/toggle";
import { Check } from "lucide-react";
import { styled } from "@mui/material";
import clsx from "clsx";
import { Drink } from "@/classes/Drink";

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

                    <div className="w-2/5 p-4 bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-md">
                        <p className="text-xl font-medium text-white">
                            I drank {drinkInputState.name} on{" "}
                            {selectedDate?.format("MMMM Do YYYY") || "a date"}.
                        </p>
                        <Toggle
                            defaultPressed={
                                !!drinkInputState.drinkRecordHistory?.[
                                    selectedDate?.format("MM-DD-YYYY")
                                ]
                            }
                            onClick={toggleDrinkRecord}
                            className="mt-2 bg-white/25 text-pastel-pink rounded-md w-full flex items-center justify-center focus:outline-none data-[state=on]:bg-white data-[state=on]:text-pastel-orange"
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
            />

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
    );
}

export default DrinkInput;
