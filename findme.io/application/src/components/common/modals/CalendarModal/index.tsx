import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { Calendar, DateData } from 'react-native-calendars';
import { Modal, TouchableOpacity } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@utils/scaling';
import { colors } from '@utils/colors';

export type calendarModalForward = {
  onClose(): void;
  onOpen(): void;
};
type calendarModalProps = {
  handleDayPress(day: DateData): void;
  value: number;
};

const CalendarModal = forwardRef<calendarModalForward, calendarModalProps>(({ handleDayPress, value }, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const currentDateInCorrectFormat = useMemo(() => new Date(value).toISOString().split('T')[0], [value]);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, []);

  useImperativeHandle(ref, () => ({
    onClose,
    onOpen,
  }));

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      hardwareAccelerated
      transparent
    >
      <TouchableOpacity onPress={onClose} style={{ position: 'absolute', width: DEVICE_WIDTH, height: DEVICE_HEIGHT, backgroundColor: colors.black00_40 }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: DEVICE_WIDTH, height: 400, backgroundColor: colors.whiteFF, borderWidth: 1, borderColor: colors.grayE8, position: 'absolute', bottom: 0 }}>
          <Calendar
            markedDates={{
              [currentDateInCorrectFormat]: { selected: true, marked: true, selectedColor: colors.redE9 },
            }}
            maxDate={new Date().toDateString()}
            enableSwipeMonths
            disableAllTouchEventsForDisabledDays
            needsOffscreenAlphaCompositing
            onDayPress={handleDayPress}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});

export { CalendarModal };
