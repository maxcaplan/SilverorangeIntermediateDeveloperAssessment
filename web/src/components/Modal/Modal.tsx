export function Modal(props: any) {
  return (
    <div className="fixed z-10 w-full min-h-full inset-0 overflow-y-auto bg-gray-900/50">
      <div className="container mx-auto py-3 px-2">{props.children}</div>
    </div>
  );
}
