
class ByteStream
{
	constructor(bytes)
	{
		this.bytes = bytes;

		this.numberOfBytesTotal = this.bytes.length;
		this.byteIndexCurrent = 0;
	}

	peekBytes(numberOfBytesToRead)
	{
		var returnValue = [];

		for (var b = 0; b < numberOfBytesToRead; b++)
		{
			returnValue[b] = this.bytes.charCodeAt(this.byteIndexCurrent + b);
		}

		return returnValue;
	}

	readByte()
	{
		var returnValue =
			this.bytes.charCodeAt(this.byteIndexCurrent) & 0xFF;

		this.byteIndexCurrent++;

		return returnValue;
	}

	readBytes(numberOfBytesToRead)
	{
		var returnValue = [];

		for (var b = 0; b < numberOfBytesToRead; b++)
		{
			returnValue[b] = this.readByte();
		}

		return returnValue;
	}

	readBytesAsHexadecimal(numberOfBytesToRead)
	{
		var bytesRead =
			this.readBytes(numberOfBytesToRead);
		var returnValue =
			bytesRead.map
			(
				x => x.toString(16).padStart(2, "0")
			).join(" ");
		return returnValue;
	}

	readIntBE() // "BE" = "Big Endian", that is, most significant byte first.
	{
		return this.readIntBEUnsigned();
	}

	readIntBESigned()
	{
		var returnValue =
		(
			(this.readByte() << 24)
			| (this.readByte() << 16 )
			| (this.readByte() << 8)
			| this.readByte()
		);

		return returnValue;
	}

	readIntBEUnsigned()
	{
		var byteHighest = this.readByte();

		var returnValue =
		(
			(this.readByte() << 16)
			| (this.readByte() << 8 )
			| this.readByte()
		);

		var byteHighestShifted = (byteHighest << 23) * 2; // Treat as unsigned.

		returnValue += byteHighestShifted;

		return returnValue;
	}

	readIntLE() // "LE" = "Little Endian", that is, least significant byte first.
	{
		return this.readIntLEUnsigned();
	}

	readIntLESigned()
	{
		var returnValue =
		(
			this.readByte()
			| (this.readByte() << 8 )
			| (this.readByte() << 16)
			| (this.readByte() << 24)
		);

		return returnValue;
	}

	readIntLEUnsigned()
	{
		var returnValue =
		(
			this.readByte()
			| (this.readByte() << 8 )
			| (this.readByte() << 16)
		);

		var byteHighest = this.readByte();
		var byteHighestShifted = (byteHighest << 23) * 2; // Treat as unsigned.

		returnValue += byteHighestShifted;

		return returnValue;
	}

	readShortLE()
	{
		var returnValue =
		(
			(this.readByte() & 0xFF)
			| ((this.readByte() & 0xFF) << 8 )
		);

		return returnValue;
	}

	readString(stringLengthInBytes)
	{
		var stringAsBytes =
			this.readBytes(stringLengthInBytes);
		var returnString =
			stringAsBytes.map(x => String.fromCharCode(x)).join("");
		return returnString;
	}
}
