import ExecutiveCard from "@/components/cards/executiveCard";
import Editor from "@/components/editor";
import EventDetailsForm from "@/components/event/eventDetailsForm";
import EventImagesForm from "@/components/event/eventImagesForm";
import EventScheduleForm from "@/components/event/eventScheduleForm";
import EventSponsorForm from "@/components/event/eventSponsorForm";
import Stepper from "@/components/stepper";
import Head from "next/head";
import { useRef, useState } from "react";

const steps = [
  { value: "Provide Details" },
  {
    value: "Provide Contents",
  },
  { value: "Provide Images" },
  { value: "Provide Schedules" },
  { value: "Provide Sponsor" },
  { value: "Preview & Save" },
];
const options = [
  "It Carnival",
  "Gaming",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
];

function getSuggestions(userInput) {
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(userInput.toLowerCase())
  );
  return filteredOptions;
}
export default function AddEvent() {
  const [currentStep, setCurrentStep] = useState(1);
  // first step
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [parent, setParent] = useState("");
  const [suggestedOptions, setSuggestedOptions] = useState([]);

  // second step
  const editorRef = useRef();
  const [description, setDescription] = useState("");

  // third step
  const [img, setImg] = useState(null);
  const [coverImgLand, setCoverImgLand] = useState(null);
  const [coverImgPort, setCoverImgPort] = useState(null);

  // forth step
  const [schedules, setSchedules] = useState([]);

  // fifth step
  const [sponsors, setSponsors] = useState([]);

  const [validateError, setValidateError] = useState("There is a error");

  console.log(schedules);
  function onTitleChange(e) {
    setTitle(e.target.value);
  }

  function onShortDescriptionChange(e) {
    setShortDescription(e.target.value);
  }

  function onParentChange(e) {
    const input = e.currentTarget.value;
    if (input !== "") {
      const suggestedOptions = getSuggestions(input); // Implement this function to get the suggested options based on the user input.
      setParent(input);
      setSuggestedOptions(suggestedOptions);
    } else {
      setParent(input);
      setSuggestedOptions([]);
    }
  }
  function onOptionsClick(e) {
    const selectedOption = e.currentTarget.innerText;
    setParent(selectedOption);
    setSuggestedOptions([]);
  }

  function handleImgChange(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImg(selectedImage);
    }
  }

  function handleCoverLandChange(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setCoverImgLand(selectedImage);
    }
  }

  function handleCoverPortChange(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setCoverImgPort(selectedImage);
    }
  }

  function handleAddSchedule(schedule) {
    setSchedules([...schedules, schedule]);
  }
  function handleDeleteSchedules(index) {
    const newSchedules = [...schedules];
    newSchedules.splice(index, 1);
    setSchedules(newSchedules);
  }

  function handleAddSponsor(sponsor) {
    setSponsors([...sponsors, sponsor]);
  }

  function handleDeleteSponsor(index) {
    const newSponsors = [...sponsors];
    newSponsors.splice(index, 1);
    setSponsors(newSponsors);
  }
  function validateStep(step) {
    if (step === 1) {
      if (!title || !shortDescription) {
        setValidateError(
          "please provide title and shortdescription in order to procced next!"
        );
        return false;
      } else {
        setValidateError("");
        return true;
      }
    }
    if (step === 2) {
      if (!description) {
        setValidateError("please provide desciption in order to precced next!");
        return false;
      } else {
        setValidateError("");
        return true;
      }
    }
    if (step === 3) {
      if (!img || !coverImgLand || !coverImgPort) {
        setValidateError(
          "please provide image , landscape and portrait cover imgs to procced next!"
        );
        return false;
      } else {
        setValidateError("");
        return true;
      }
    }
    return true;
  }

  function chooseComp(step) {
    if (step === 1)
      return (
        <EventDetailsForm
          title={title}
          shortDescription={shortDescription}
          parentValue={parent}
          onTitle={onTitleChange}
          onShortDescription={onShortDescriptionChange}
          suggestedOptions={suggestedOptions}
          onParentChange={onParentChange}
          onOptionclick={onOptionsClick}
        />
      );
    if (step === 2) return <Editor ref={editorRef} />;
    if (step === 3)
      return (
        <EventImagesForm
          img={img}
          coverImgLand={coverImgLand}
          coverImgPort={coverImgPort}
          handleCoverLandChange={handleCoverLandChange}
          handleCoverPortChange={handleCoverPortChange}
          handleImgChange={handleImgChange}
        />
      );
    if (step === 4)
      return (
        <EventScheduleForm
          onSchdule={handleAddSchedule}
          onDelete={handleDeleteSchedules}
          schedules={schedules}
        />
      );
    if (step === 5)
      return (
        <EventSponsorForm
          onDelete={handleDeleteSponsor}
          onAdd={handleAddSponsor}
          sponsors={sponsors}
        />
      );
    if (step === 6) return <h1>Preview and Save</h1>;
  }
  return (
    <>
      <Head>
        <title>PSTU CSE CLUB - An non-profit organization</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="addevent__page">
          <div className="addevent__wrapper">
            <Stepper step={currentStep} steps={steps} />
            <div className="addevent__step__details">
              {chooseComp(currentStep)}
              {validateError && (
                <div className="addevent__step__error">{validateError}</div>
              )}
              <div className="addevent__step__btns">
                {currentStep !== 1 && (
                  <button
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                    }}
                    className="addevent__step__btn addevent__step__btn--left"
                  >
                    Prev
                  </button>
                )}
                {currentStep !== steps.length && (
                  <button
                    onClick={() => {
                      if (currentStep === 2) {
                        if (editorRef.current.value) {
                          setDescription(editorRef.current.value);
                          setCurrentStep(currentStep + 1);
                          return;
                        }
                      }

                      const isValidated = validateStep(currentStep);
                      isValidated && setCurrentStep(currentStep + 1);
                    }}
                    className="addevent__step__btn addevent__step__btn--right"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
