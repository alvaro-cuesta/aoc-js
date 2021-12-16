const { describeDay } = require('../test-utils')

describeDay(
  2021,
  16,

  967,
  12883091136209,

  ({ parseStream, parsePacket }) => {
    describe('parsePacket', () => {
      it('Parses literals', () => {
        expect.assertions(1)
        expect(parsePacket(parseStream('D2FE28'))).toEqual([
          { version: 6, id: 4, type: 'literal', value: 2021 },
          '000',
        ])
      })

      it('Parses bitlength operators', () => {
        expect.assertions(1)
        expect(parsePacket(parseStream('38006F45291200'))).toEqual([
          {
            version: 1,
            id: 6,
            type: 'operator',
            subpackets: [
              { version: 6, id: 4, type: 'literal', value: 10 },
              { version: 2, id: 4, type: 'literal', value: 20 },
            ],
          },
          '0000000',
        ])
      })

      it('Parses subpackets-length operators', () => {
        expect.assertions(1)
        expect(parsePacket(parseStream('EE00D40C823060'))).toEqual([
          {
            version: 7,
            id: 3,
            type: 'operator',
            subpackets: [
              { version: 2, id: 4, type: 'literal', value: 1 },
              { version: 4, id: 4, type: 'literal', value: 2 },
              { version: 1, id: 4, type: 'literal', value: 3 },
            ],
          },
          '00000',
        ])
      })
    })
  },

  (part1) => {
    test('Examples', () => {
      expect.assertions(4)
      expect(part1('8A004A801A8002F478')).toEqual(16)
      expect(part1('620080001611562C8802118E34')).toEqual(12)
      expect(part1('C0015000016115A2E0802F182340')).toEqual(23)
      expect(part1('A0016C880162017C3686B18A3D4780')).toEqual(31)
    })
  },

  (part2) => {
    test('Examples', () => {
      expect.assertions(8)
      expect(part2('C200B40A82')).toEqual(3)
      expect(part2('04005AC33890')).toEqual(54)
      expect(part2('880086C3E88112')).toEqual(7)
      expect(part2('CE00C43D881120')).toEqual(9)
      expect(part2('D8005AC2A8F0')).toEqual(1)
      expect(part2('F600BC2D8F')).toEqual(0)
      expect(part2('9C005AC2F8F0')).toEqual(0)
      expect(part2('9C0141080250320F1802104A08')).toEqual(1)
    })
  },
)
