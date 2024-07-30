import { createSignal } from "solid-js";
import Collapsible from "./components/Collapsible";
import styles from "./App.module.css";

const App = () => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  return (
    <div class="p-2 h-52 flex bg-black">
      <Collapsible
        as="div"
        class="border rounded h-full w-full flex justify-items-center p-4"
        isOpen={isOpen()}
        onToggle={(open: boolean) => setIsOpen(open)}
      >
        {({ isOpen, toggle }) => (
          <div class="w-full flex flex-col gap-y-2 h-full">
            <div class="relative max-w-fit">
              {!isOpen && (
                <span class="absolute flex h-3 w-3 right-0 bottom-8">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              )}
              <Collapsible
                as="button"
                onClick={toggle}
                class="border px-4 rounded py-2 text-white flex justify-items-center max-w-fit"
              >
                Toggle
              </Collapsible>
            </div>

            {isOpen && (
              <Collapsible
                as="div"
                class={`overflow-hidden grow rounded bg-orange-600 text-white flex justify-center items-center ${
                  isOpen ? styles.collapseOpen : null
                }`}
              >
                Content
              </Collapsible>
            )}
          </div>
        )}
      </Collapsible>
    </div>
  );
};

export default App;
