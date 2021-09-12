
class ByteStreamLittleEndian
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
			returnValue[b] = this.bytes[this.byteIndexCurrent + b];
		}

		return returnValue;
	}

	readByte()
	{
		var returnValue =
			this.bytes.charCodeAt(this.byteIndexCurrent);

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

	readInt()
	{
		var returnValue =
		(
			(this.readByte() & 0xFF)
			| ((this.readByte() & 0xFF) << 8 )
			| ((this.readByte() & 0xFF) << 16)
			| ((this.readByte() & 0xFF) << 24)
		);

		return returnValue;
	}

	readShort()
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
