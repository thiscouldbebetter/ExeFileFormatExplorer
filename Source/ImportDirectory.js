
class ImportDirectory
{
	constructor
	(
		originalFirstThunk,
		timeDateStamp,
		forwarderChain,
		name,
		firstThunk
	)
	{
		this.originalFirstThunk = originalFirstThunk;
		this.timeDateStamp = timeDateStamp;
		this.forwarderChain = forwarderChain;
		this.name = name;
		this.firstThunk = firstThunk;
	}
}
