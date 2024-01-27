import PromptSuggestionButton from "./PromptSuggestionButton";
import { useRouter } from "next/navigation";

const PromptSuggestionRow = ({ onPromptClick }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row flex-wrap justify-start items-center py-4 gap-2">
      <PromptSuggestionButton
        text="View insights"
        onClick={() => router.push("/insights")}
      />
    </div>
  );
};

export default PromptSuggestionRow;
