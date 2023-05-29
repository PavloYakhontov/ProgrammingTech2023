import React, { useCallback, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextView } from '@components/TextView';
import BirthdayIcon from '@assets/svg/birthday.svg';
import { wDP } from '@utils/scaling';
import { Styles } from '@styles/load';
import { Calendar, DateData } from 'react-native-calendars';
import { CalendarModal, calendarModalForward } from '@components/common/modals/CalendarModal';

type selectBirthdayViewProps = {
  value: number;
  setSelectedDate(num: number): void;
};
const SelectBirthdayView: React.FC<selectBirthdayViewProps> = ({ setSelectedDate, value }) => {
  const modalRef = useRef<calendarModalForward>(null);
  const handleDayPress = (day: DateData) => {
    const timestamp = Date.parse(day.dateString);
    setSelectedDate(timestamp);
  };

  const handlePressView = useCallback(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.onOpen && modalRef.current.onOpen();
    }
  }, [modalRef]);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={handlePressView} style={[Styles.Layout.flexRow, Styles.Container.redBackgroundColor, Styles.Layout.rad15]}>
        <View style={[Styles.Layout.flexRow, Styles.MarginPadding.pv20, Styles.MarginPadding.ph20, Styles.Layout.ai_c]}>
          <BirthdayIcon width={wDP(20)} height={wDP(20)} />
          <View style={[Styles.MarginPadding.ml8]}>
            <TextView text="choose_birthday" styles={[Styles.Text.smallText16RedBold]} />
            <Text style={Styles.Text.smallText16RedBold}>
              Current:
              {' '}
              {new Date(value).toISOString().split('T')[0]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <CalendarModal
        value={value}
        ref={modalRef}
        handleDayPress={handleDayPress}
      />
    </React.Fragment>
  );
};

export { SelectBirthdayView };
