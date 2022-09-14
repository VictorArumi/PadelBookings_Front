import BookingDetail from "../../components/BookingDetail/BookingDetail";

const BookingDetailPage = (): JSX.Element => {
  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-center my-5 text-3xl">Detalle de la reserva</h1>
      <BookingDetail />
    </div>
  );
};

export default BookingDetailPage;
