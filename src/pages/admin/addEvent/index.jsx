import { getParentEvents } from "@/actions/event";
import AdminTopBar from "@/components/admin/adminTopBar";
import Editor from "@/components/editor";
import EventDetailsForm from "@/components/event/eventDetailsForm";
import EventImagesForm from "@/components/event/eventImagesForm";
import EventSaveAndPreview from "@/components/event/eventSavePreview";
import EventScheduleForm from "@/components/event/eventScheduleForm";
import EventSponsorForm from "@/components/event/eventSponsorForm";
import Stepper from "@/components/stepper";
import StepSwitcher from "@/components/stepper/stepSwitcher";
import { ProgressBar } from "react-loader-spinner";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const initialSteps = [
  { title: "Provide Details", validated: false, no: 1 },
  {
    title: "Contents",
    validated: false,
    no: 2,
  },
  { title: "Images", validated: false, no: 3 },
  { title: "Schedules", validated: false, no: 4 },
  { title: "Sponsor", validated: false, no: 5 },
  { title: "Preview & Save", validated: false, no: 6 },
];

export default function AddEvent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [steps, setSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(1);
  // first step
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [parent, setParent] = useState("");
  const [parentOptions, setParentOptions] = useState([]);

  // second step
  const editorRef = useRef();
  const [description, setDescription] = useState("");

  // third step
  const [image, setImage] = useState(null);
  const [coverImgLand, setCoverImgLand] = useState(null);
  const [coverImgPort, setCoverImgPort] = useState(null);

  // forth step
  const [schedules, setSchedules] = useState([]);

  // fifth step
  const [sponsors, setSponsors] = useState([]);

  const [validateError, setValidateError] = useState("");

  useEffect(() => {
    getParentEvents(setParentOptions, setLoading, setError);
  }, []);
  function onTitleChange(e) {
    setTitle(e.target.value);
  }

  function onShortDescriptionChange(e) {
    setShortDescription(e.target.value);
  }

  function handleImgChange(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
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

  function updateStepsValidate(step, value) {
    const updatedSteps = steps.map((s) => {
      if (s.no === step) {
        s.validated = value;
      }
      return s;
    });
    setSteps(updatedSteps);
  }
  function validateStep(step) {
    if (step === 1) {
      if (!title || !shortDescription) {
        setValidateError(
          "please provide title and shortdescription in order to procced next!"
        );
        updateStepsValidate(step, false);
        return false;
      } else {
        setValidateError("");
        updateStepsValidate(step, true);
        return true;
      }
    }
    if (step === 2) {
      if (!description) {
        setValidateError("please provide desciption in order to precced next!");
        updateStepsValidate(step, false);
        return false;
      } else {
        setValidateError("");
        updateStepsValidate(step, true);
        return true;
      }
    }
    if (step === 3) {
      if (!image || !coverImgLand || !coverImgPort) {
        setValidateError(
          "please provide image , landscape and portrait cover imgs to procced next!"
        );
        updateStepsValidate(step, false);
        return false;
      } else {
        setValidateError("");
        updateStepsValidate(step, true);
        updateStepsValidate(6, true);
        return true;
      }
    }
    updateStepsValidate(step, true);
    return true;
  }

  function chooseComp(step) {
    if (step === 1)
      return (
        <EventDetailsForm
          title={title}
          shortDescription={shortDescription}
          parentValue={parent}
          setParentValue={setParent}
          onTitle={onTitleChange}
          onShortDescription={onShortDescriptionChange}
          options={parentOptions}
        />
      );
    if (step === 2)
      return (
        <div className="addevent__page__editor">
          <button
            onClick={() => {
              if (editorRef.current.value) {
                setDescription(editorRef.current.value);
              }
            }}
            className="addevent__page__editor__save-btn"
          >
            Save
          </button>
          <Editor ref={editorRef} />
        </div>
      );
    if (step === 3)
      return (
        <EventImagesForm
          img={image}
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
    if (step === 6)
      return (
        <EventSaveAndPreview
          parentId={getParentId()}
          event={getEvent()}
          formEvent={getEventFormData()}
        />
      );
  }

  function getEvent() {
    let event = {
      _id: Math.random() * 1000 + "2ekfkde" + Date.now() + "",
      title,
      shortDescription,
      description,
      schedules,
      sponsors,
      img: URL.createObjectURL(image),
      coverImgLand: URL.createObjectURL(coverImgLand),
      coverImgPort: URL.createObjectURL(coverImgPort),
    };

    return event;
  }

  function getParentId() {
    let parentId = "";
    let matched = parentOptions.filter((p) => p.title === parent)[0];
    if (matched) parentId = matched._id;
    return parentId;
  }
  function getEventFormData() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);

    // Assuming `schedules` is an array, you can append each schedule as a separate field
    // for (let i = 0; i < schedules.length; i++) {
    //   formData.append(`schedules[${i}].title`, schedules[i].title);
    //   formData.append(`schedules[${i}].time`, schedules[i].time);
    //   formData.append(`schedules[${i}].details`, schedules[i].details);
    // }
    formData.append("schedules", JSON.stringify(schedules));

    // handling sponsors
    let sponsorImgs = [];
    let filteredSponsors = [];
    for (let i = 0; i < sponsors.length; i++) {
      let sponsor = {};
      sponsor.name = sponsors[i].name;
      sponsor.site = sponsors[i].site;
      filteredSponsors.push(sponsor);
      formData.append("sponsorImg", sponsors[i].img);
    }

    // Apend sponsors images here
    formData.append("sponsors", JSON.stringify(filteredSponsors));

    // Append the image files to the form data
    formData.append("image", image);
    formData.append("coverImgLand", coverImgLand);
    formData.append("coverImgPort", coverImgPort);
    return formData;
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
        <AdminTopBar />
        <div className="addevent__page">
          {loading && (
            <ProgressBar
              height="40"
              width="40"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          )}
          {error && (
            <button className={`state-btn state-btn--error`}>
              <RestartAltIcon fontSize="medium" /> Something Bad Happend
            </button>
          )}
          {!loading && !error && (
            <div className="addevent__wrapper">
              <StepSwitcher
                excepts={[6]}
                setStep={setCurrentStep}
                steps={steps}
              />
              <div className="addevent__stepper">
                <Stepper step={currentStep} steps={steps} />
              </div>
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
                            updateStepsValidate(2, true);
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
          )}
        </div>
      </div>
    </>
  );
}
