import { Scrollbars } from "react-custom-scrollbars-2"

export default function CustomScrollbar({ children, style }: any) {
  return (
    <Scrollbars
      style={style}
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      renderThumbVertical={(props) => (
        <div
          {...props}
          style={{
            backgroundColor: "rgba(139,92,246,0.6)",
            borderRadius: "10px",
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  )
}